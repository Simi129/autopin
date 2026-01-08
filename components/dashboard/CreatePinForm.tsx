'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { getBoards, publishNow, schedulePost, getPinterestStatus } from '@/lib/api';
import { Calendar, Image as ImageIcon, Loader2, Plus, Upload, X, Link as LinkIcon } from 'lucide-react';
import CreateBoardModal from './CreateBoardModal';

export default function CreatePinForm() {
  const [user, setUser] = useState<any>(null);
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [pinterestConnected, setPinterestConnected] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleBoardCreated = async () => {
    if (user) {
      setLoadingBoards(true);
      await checkPinterestAndLoadBoards(user.id);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 32 * 1024 * 1024) {
      alert('Image size must be less than 32MB');
      return;
    }

    setUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      
      // Извлекаем только base64 данные (без префикса data:image/...)
      const base64Data = result.split(',')[1];
      setImageBase64(base64Data);
      
      // Для совместимости устанавливаем URL как превью
      setFormData({ ...formData, image_url: result });
      setUploading(false);
    };

    reader.onerror = () => {
      alert('Failed to read file');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image_url: '' });
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent, action: 'now' | 'schedule') => {
    e.preventDefault();
    
    if (!user || !formData.board_id || !formData.title) {
      alert('Please fill in all required fields');
      return;
    }

    // Проверка наличия изображения
    if (uploadMethod === 'url' && !formData.image_url) {
      alert('Please enter an image URL');
      return;
    }

    if (uploadMethod === 'upload' && !imageBase64) {
      alert('Please upload an image');
      return;
    }

    if (action === 'schedule' && !formData.scheduled_at) {
      alert('Please select a date and time for scheduling');
      return;
    }

    setLoading(true);
    try {
      const postData: any = {
        user_id: user.id,
        board_id: formData.board_id,
        title: formData.title,
        description: formData.description,
        link: formData.link || undefined,
      };

      // Добавляем изображение в зависимости от метода
      if (uploadMethod === 'upload' && imageBase64) {
        postData.image_base64 = imageBase64;
      } else {
        postData.image_url = formData.image_url;
      }

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
      setImagePreview(null);
      setImageBase64(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Create New Pin</h3>
        
        <form className="space-y-4">
          {/* Board Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Board <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={formData.board_id}
                onChange={(e) => setFormData({ ...formData, board_id: e.target.value })}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              >
                <option value="">Select a board</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowCreateBoardModal(true)}
                className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium text-slate-600"
                title="Create new board"
              >
                <Plus size={16} />
                New
              </button>
            </div>
          </div>

          {/* Image Upload Method */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setUploadMethod('url');
                  setImagePreview(null);
                  setImageBase64(null);
                }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  uploadMethod === 'url'
                    ? 'bg-rose-50 text-rose-600 border-2 border-rose-500'
                    : 'bg-slate-50 text-slate-600 border-2 border-slate-200'
                }`}
              >
                <LinkIcon size={16} />
                Image URL
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadMethod('upload');
                  setFormData({ ...formData, image_url: '' });
                }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  uploadMethod === 'upload'
                    ? 'bg-rose-50 text-rose-600 border-2 border-rose-500'
                    : 'bg-slate-50 text-slate-600 border-2 border-slate-200'
                }`}
              >
                <Upload size={16} />
                Upload File
              </button>
            </div>

            {/* Image URL Input */}
            {uploadMethod === 'url' && (
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            )}

            {/* File Upload */}
            {uploadMethod === 'upload' && (
              <div>
                {!imagePreview ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-10 h-10 text-slate-400 animate-spin mb-2" />
                          <p className="text-sm text-slate-500">Processing image...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-slate-400 mb-3" />
                          <p className="text-sm text-slate-600 font-medium mb-1">Click to upload image</p>
                          <p className="text-xs text-slate-500">PNG, JPG, WEBP (max 32MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-56 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
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
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
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
              disabled={loading || uploading}
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
              disabled={loading || uploading || !formData.scheduled_at}
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

      <CreateBoardModal
        isOpen={showCreateBoardModal}
        onClose={() => setShowCreateBoardModal(false)}
        onSuccess={handleBoardCreated}
        userId={user?.id || ''}
      />
    </>
  );
}