'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getBoards, publishNow, schedulePost, getPinterestStatus } from '@/lib/api';
import { Calendar, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function CreatePinForm() {
  const [user, setUser] = useState<any>(null);
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [pinterestConnected, setPinterestConnected] = useState(false);
  
  const [formData, setFormData] = useState({
    board_id: '',
    image_url: '',
    title: '',
    description: '',
    link: '',
    scheduled_at: '',
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      await checkPinterestAndLoadBoards(user.id);
    }
  };

  const checkPinterestAndLoadBoards = async (userId: string) => {
    try {
      const status = await getPinterestStatus(userId);
      setPinterestConnected(status.connected);
      
      if (status.connected) {
        const data = await getBoards(userId);
        setBoards(data.boards || []);
      }
    } catch (error) {
      console.error('Error loading boards:', error);
    } finally {
      setLoadingBoards(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, action: 'now' | 'schedule') => {
    e.preventDefault();
    if (!user || !formData.board_id || !formData.image_url || !formData.title) {
      alert('Please fill in all required fields');
      return;
    }

    if (action === 'schedule' && !formData.scheduled_at) {
      alert('Please select a date and time for scheduling');
      return;
    }

    setLoading(true);
    try {
      const postData = {
        user_id: user.id,
        board_id: formData.board_id,
        image_url: formData.image_url,
        title: formData.title,
        description: formData.description,
        link: formData.link || undefined,
      };

      if (action === 'now') {
        await publishNow(postData);
        alert('Pin published successfully! 🎉');
      } else {
        await schedulePost({
          ...postData,
          scheduled_at: new Date(formData.scheduled_at).toISOString(),
        });
        alert('Pin scheduled successfully! 📅');
      }

      // Reset form
      setFormData({
        board_id: '',
        image_url: '',
        title: '',
        description: '',
        link: '',
        scheduled_at: '',
      });
    } catch (error) {
      console.error('Error publishing/scheduling pin:', error);
      alert('Failed to publish/schedule pin. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!pinterestConnected) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Connect Pinterest First</h3>
        <p className="text-slate-500">Please connect your Pinterest account above to start creating pins.</p>
      </div>
    );
  }

  if (loadingBoards) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Create New Pin</h3>
      
      <form className="space-y-4">
        {/* Board Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Board <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.board_id}
            onChange={(e) => setFormData({ ...formData, board_id: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          >
            <option value="">Select a board</option>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Image URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter pin title"
            maxLength={100}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
          <p className="text-xs text-slate-500 mt-1">{formData.title.length}/100 characters</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter pin description"
            rows={3}
            maxLength={500}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <p className="text-xs text-slate-500 mt-1">{formData.description.length}/500 characters</p>
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Destination Link
          </label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://your-website.com"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Scheduled Date/Time */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Schedule For (Optional)
          </label>
          <input
            type="datetime-local"
            value={formData.scheduled_at}
            onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'now')}
            disabled={loading}
            className="flex-1 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish Now'
            )}
          </button>
          
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'schedule')}
            disabled={loading || !formData.scheduled_at}
            className="flex-1 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                Schedule Pin
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}