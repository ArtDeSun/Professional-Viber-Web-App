import { useState } from "react";
import {
  LandscapeVideoBoard,
  LandscapeVideoSection,
} from "../models/models.types";

type LandscapeVideoSectionUpdates = Partial<Omit<LandscapeVideoSection, "_id">>;

function sortSections(
  sections: LandscapeVideoSection[],
): LandscapeVideoSection[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

export function useLandscapeVideoBoard(
  initialLandscapeVideoBoard: LandscapeVideoBoard,
) {
  const [landscapeVideoBoard, setLandscapeVideoBoard] =
    useState<LandscapeVideoBoard>(() => ({
      ...initialLandscapeVideoBoard,
      landscapeVideoSections: sortSections(
        initialLandscapeVideoBoard.landscapeVideoSections ?? [],
      ),
    }));

  const landscapeVideoSections: LandscapeVideoSection[] =
    landscapeVideoBoard.landscapeVideoSections ?? [];

  //const [error, setError] = useState<string | null>(null);

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
          newSection,
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

  return {
    landscapeVideoBoard,
    landscapeVideoSections,
    addLandscapeVideoSection,
    modifyLandscapeVideoSection,
    removeLandscapeVideoSection,
  };
}
