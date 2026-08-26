import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as contentService from '../services/content.service';

export const CONTENT_QUERY_KEYS = {
  subjects: ['subjects'] as const,
  subjectDetail: (id: string) => ['subjects', id] as const,
  subjectChapters: (id: string) => ['subjects', id, 'chapters'] as const,
  chapterDetail: (id: string) => ['chapters', id] as const,
  lessonDetail: (id: string) => ['lessons', id] as const,
};

export const useSubjects = () =>
  useQuery({
    queryKey: CONTENT_QUERY_KEYS.subjects,
    queryFn: contentService.listSubjects,
  });

export const useSubject = (subjectId: string) =>
  useQuery({
    queryKey: CONTENT_QUERY_KEYS.subjectDetail(subjectId),
    queryFn: () => contentService.getSubject(subjectId),
    enabled: Boolean(subjectId),
  });

export const useSubjectChapters = (subjectId: string) =>
  useQuery({
    queryKey: CONTENT_QUERY_KEYS.subjectChapters(subjectId),
    queryFn: () => contentService.getSubjectChapters(subjectId),
    enabled: Boolean(subjectId),
  });

export const useChapter = (chapterId: string) =>
  useQuery({
    queryKey: CONTENT_QUERY_KEYS.chapterDetail(chapterId),
    queryFn: () => contentService.getChapter(chapterId),
    enabled: Boolean(chapterId),
  });

export const useLesson = (lessonId: string) =>
  useQuery({
    queryKey: CONTENT_QUERY_KEYS.lessonDetail(lessonId),
    queryFn: () => contentService.getLesson(lessonId),
    enabled: Boolean(lessonId),
  });

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contentService.createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEYS.subjects });
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subjectId, data }: { subjectId: string; data: Parameters<typeof contentService.updateSubject>[1] }) =>
      contentService.updateSubject(subjectId, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEYS.subjects });
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEYS.subjectDetail(variables.subjectId) });
    },
  });
};

export const useCreateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ subjectId, data }: { subjectId: string; data: { title: string; description?: string } }) =>
      contentService.createChapter(subjectId, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEYS.subjectChapters(variables.subjectId) });
    },
  });
};

export const useUpdateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chapterId, data }: { chapterId: string; data: Parameters<typeof contentService.updateChapter>[1] }) =>
      contentService.updateChapter(chapterId, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEYS.chapterDetail(variables.chapterId) });
    },
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chapterId, data }: { chapterId: string; data: Parameters<typeof contentService.createLesson>[1] }) =>
      contentService.createLesson(chapterId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, data }: { lessonId: string; data: Parameters<typeof contentService.updateLesson>[1] }) =>
      contentService.updateLesson(lessonId, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEYS.lessonDetail(variables.lessonId) });
    },
  });
};
