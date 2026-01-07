// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Pinterest Connection
export async function connectPinterest(userId: string) {
  window.location.href = `${API_URL}/auth/pinterest?user_id=${userId}`;
}

export async function getPinterestStatus(userId: string) {
  const response = await fetch(`${API_URL}/auth/pinterest/status?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to get Pinterest status');
  return response.json();
}

export async function disconnectPinterest(userId: string) {
  const response = await fetch(`${API_URL}/auth/pinterest/disconnect?user_id=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to disconnect Pinterest');
  return response.json();
}

// Boards
export async function getBoards(userId: string) {
  const response = await fetch(`${API_URL}/api/boards?user_id=${userId}`);
  if (!response.ok) throw new Error('Failed to get boards');
  return response.json();
}

// Posts
export async function publishNow(data: {
  user_id: string;
  board_id: string;
  image_url: string;
  title: string;
  description?: string;
  link?: string;
}) {
  const response = await fetch(`${API_URL}/api/publish-now`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to publish post');
  return response.json();
}

export async function schedulePost(data: {
  user_id: string;
  board_id: string;
  image_url: string;
  title: string;
  description?: string;
  link?: string;
  scheduled_at: string; // ISO format
}) {
  const response = await fetch(`${API_URL}/api/schedule-post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to schedule post');
  return response.json();
}