import { useState } from "react";
import {
  LandscapeVideo,
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "../models/models.types";

type LandscapeVideoSectionUpdates = Partial<Omit<LandscapeVideoSection, "_id">>;

type LandscapeVideoUpdates = Partial<Omit<LandscapeVideo, "_id">>;

//Call only if necessary - current approach is inefficient because every hook does sorting
function sortSections(
  sections: LandscapeVideoSection[],
): LandscapeVideoSection[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

//Call only if necessary - current approach is inefficient because every hook does sorting
function sortVideos(videos: LandscapeVideo[]): LandscapeVideo[] {
  return [...videos].sort((a, b) => a.order - b.order);
}

export function useLandscapeVideoBoard(
  initialLandscapeVideoBoard: LandscapeVideoBoard,
) {
  const [landscapeVideoBoard, setLandscapeVideoBoard] =
    useState<LandscapeVideoBoard>(() => ({
      ...initialLandscapeVideoBoard,
      landscapeVideoSections: sortSections(
        initialLandscapeVideoBoard.landscapeVideoSections ?? [],
      ).map((section) => ({
        ...section,
        landscapeVideos: sortVideos(section.landscapeVideos ?? []),
      })),
    }));

  const landscapeVideoSections: LandscapeVideoSection[] =
    landscapeVideoBoard.landscapeVideoSections ?? [];

  const landscapeVideos = landscapeVideoSections.flatMap(
    (section) => section.landscapeVideos ?? [],
  );

  const featuredLandscapeVideo =
    landscapeVideos.find((video) => video.isFeatured) ?? null;

  function addLandscapeVideoSection(newSection: LandscapeVideoSection) {
    setLandscapeVideoBoard((currentBoard) => {
      const sectionAlreadyExists = currentBoard.landscapeVideoSections.some(
        (section) => section._id === newSection._id,
      );

      if (sectionAlreadyExists) {
        return currentBoard;
      }

      return {
        ...currentBoard,
        landscapeVideoSections: sortSections([
          ...currentBoard.landscapeVideoSections,
          {
            ...newSection,
            landscapeVideos: sortVideos(newSection.landscapeVideos ?? []),
          },
        ]),
      };
    });
  }

  function modifyLandscapeVideoSection(
    sectionId: string,
    updates: LandscapeVideoSectionUpdates,
  ): void {
    setLandscapeVideoBoard((currentBoard) => ({
      ...currentBoard,
      landscapeVideoSections: sortSections(
        currentBoard.landscapeVideoSections.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                ...updates,
              }
            : section,
        ),
      ),
    }));
  }

  function removeLandscapeVideoSection(sectionId: string): void {
    setLandscapeVideoBoard((currentBoard) => ({
      ...currentBoard,
      landscapeVideoSections: currentBoard.landscapeVideoSections
        .filter((section) => section._id !== sectionId)
        .sort((a, b) => a.order - b.order)
        .map((section, index) => ({
          ...section,
          order: index,
        })),
    }));
  }

  function addLandscapeVideo(
    sectionId: string,
    newVideo: LandscapeVideo,
  ): void {
    setLandscapeVideoBoard((currentBoard) => ({
      ...currentBoard,
      landscapeVideoSections: currentBoard.landscapeVideoSections.map(
        (section) => {
          const existingVideos = section.landscapeVideos ?? [];

          const videosWithoutDuplicate = existingVideos.filter(
            (video) => video._id !== newVideo._id,
          );

          const updatedVideos = newVideo.isFeatured
            ? videosWithoutDuplicate.map((video) => ({
                ...video,
                isFeatured: false,
              }))
            : videosWithoutDuplicate;

          if (section._id !== sectionId) {
            return {
              ...section,
              landscapeVideos: newVideo.isFeatured
                ? updatedVideos
                : existingVideos,
            };
          }

          return {
            ...section,
            landscapeVideos: sortVideos([...updatedVideos, newVideo]),
          };
        },
      ),
    }));
  }

  function modifyLandscapeVideo(
    videoId: string,
    updates: LandscapeVideoUpdates,
  ): void {
    setLandscapeVideoBoard((currentBoard) => ({
      ...currentBoard,
      landscapeVideoSections: currentBoard.landscapeVideoSections.map(
        (section) => ({
          ...section,
          landscapeVideos: sortVideos(
            (section.landscapeVideos ?? []).map((video) => {
              if (video._id === videoId) {
                return {
                  ...video,
                  ...updates,
                };
              }

              if (updates.isFeatured === true) {
                return {
                  ...video,
                  isFeatured: false,
                };
              }

              return video;
            }),
          ),
        }),
      ),
    }));
  }

  function removeLandscapeVideo(videoId: string): void {
    setLandscapeVideoBoard((currentBoard) => ({
      ...currentBoard,
      landscapeVideoSections: currentBoard.landscapeVideoSections.map(
        (section) => ({
          ...section,
          landscapeVideos: sortVideos(
            (section.landscapeVideos ?? [])
              .filter((video) => video._id !== videoId)
              .map((video, index) => ({
                ...video,
                order: index,
              })),
          ),
        }),
      ),
    }));
  }

  return {
    landscapeVideoBoard,
    landscapeVideoSections,
    landscapeVideos,
    featuredLandscapeVideo,
    addLandscapeVideoSection,
    modifyLandscapeVideoSection,
    removeLandscapeVideoSection,
    addLandscapeVideo,
    modifyLandscapeVideo,
    removeLandscapeVideo,
  };
}
