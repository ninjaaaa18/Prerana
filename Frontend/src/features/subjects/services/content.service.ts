import { apiClient } from '@/lib/axios';
import type { ApiSubject, ApiChapter, ApiLesson, ApiChapterWithSubject, ApiLessonWithChapter } from '../content-types';

interface ApiResponse<T> {
  data: T;
}

export const listSubjects = async (): Promise<ApiSubject[]> => {
  const response = await apiClient.get<ApiResponse<ApiSubject[]>>('/subjects');
  return response.data.data;
};

export const getSubject = async (subjectId: string): Promise<ApiSubject> => {
  const response = await apiClient.get<ApiResponse<ApiSubject>>(`/subjects/${subjectId}`);
  return response.data.data;
};

export const getSubjectChapters = async (subjectId: string): Promise<ApiChapter[]> => {
  const response = await apiClient.get<ApiResponse<ApiChapter[]>>(`/subjects/${subjectId}/chapters`);
  return response.data.data;
};

export const getChapter = async (chapterId: string): Promise<ApiChapterWithSubject> => {
  const response = await apiClient.get<ApiResponse<ApiChapterWithSubject>>(`/chapters/${chapterId}`);
  return response.data.data;
};

export const getLesson = async (lessonId: string): Promise<ApiLessonWithChapter> => {
  const response = await apiClient.get<ApiResponse<ApiLessonWithChapter>>(`/lessons/${lessonId}`);
  return response.data.data;
};

export const createSubject = async (data: {
  title: string;
  description?: string;
  color?: string;
  grade?: string;
}): Promise<ApiSubject> => {
  const response = await apiClient.post<ApiResponse<ApiSubject>>('/subjects', data);
  return response.data.data;
};

export const updateSubject = async (
  subjectId: string,
  data: {
    title?: string;
    description?: string;
    color?: string;
    grade?: string;
    status?: string;
  }
): Promise<ApiSubject> => {
  const response = await apiClient.patch<ApiResponse<ApiSubject>>(`/subjects/${subjectId}`, data);
  return response.data.data;
};

export const createChapter = async (
  subjectId: string,
  data: { title: string; description?: string }
): Promise<ApiChapter> => {
  const response = await apiClient.post<ApiResponse<ApiChapter>>(`/subjects/${subjectId}/chapters`, data);
  return response.data.data;
};

export const updateChapter = async (
  chapterId: string,
  data: { title?: string; description?: string; status?: string }
): Promise<ApiChapter> => {
  const response = await apiClient.patch<ApiResponse<ApiChapter>>(`/chapters/${chapterId}`, data);
  return response.data.data;
};

export const createLesson = async (
  chapterId: string,
  data: {
    title: string;
    type?: string;
    difficulty?: string;
    estimatedMinutes?: number;
    learningObjective?: string;
    blocks?: unknown[];
    tags?: string;
  }
): Promise<ApiLesson> => {
  const response = await apiClient.post<ApiResponse<ApiLesson>>(`/chapters/${chapterId}/lessons`, data);
  return response.data.data;
};

export const updateLesson = async (
  lessonId: string,
  data: {
    title?: string;
    type?: string;
    difficulty?: string;
    estimatedMinutes?: number;
    learningObjective?: string;
    blocks?: unknown[];
    tags?: string;
    status?: string;
  }
): Promise<ApiLesson> => {
  const response = await apiClient.patch<ApiResponse<ApiLesson>>(`/lessons/${lessonId}`, data);
  return response.data.data;
};
