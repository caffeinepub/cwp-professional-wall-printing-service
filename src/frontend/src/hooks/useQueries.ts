import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AboutUs, GalleryImage, PrintingSurface } from "../backend";
import { useActor } from "./useActor";

export function useGetGalleryImages() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryImage[]>({
    queryKey: ["galleryImages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetGalleryImagesByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryImage[]>({
    queryKey: ["galleryImages", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryImagesByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetAboutUs(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<AboutUs | null>({
    queryKey: ["aboutUs", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAboutUs(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetPrintingSurfaces() {
  const { actor, isFetching } = useActor();

  return useQuery<PrintingSurface[]>({
    queryKey: ["printingSurfaces"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrintingSurfaces();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitContactForm(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactFormSubmissions"] });
    },
  });
}
