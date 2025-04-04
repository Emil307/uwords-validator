import React, { useEffect, useState } from "react";
import {
  AddImageLater,
  ConfrimImageButton,
  WithoutImageButton,
} from "@/features/images";
import {
  getNextWord,
  ImageViewer,
  ITWord,
  updateWord,
  withoutImage,
} from "@/entities/images";
import styles from "./styles.module.scss";
import { Button } from "@/shared";

export const ValidateImage: React.FC = () => {
  const [word, setWord] = useState<ITWord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModerating, setIsModerating] = useState(false);

  useEffect(() => {
    handleGetNextWord();
  }, []);

  function handleGetNextWord() {
    setIsLoading(true);
    getNextWord()
      .then((res) => {
        setWord(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleConfirmImage() {
    if (!word) return;
    setIsModerating(true);
    updateWord(word.id, { is_moderated: true })
      .then(() => {
        handleGetNextWord();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  function handleWithoutImage() {
    if (!word) return;
    setIsModerating(true);
    withoutImage(word.id)
      .then(() => {
        handleGetNextWord();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  function handleAddImageLater() {
    if (!word) return;
    setIsModerating(true);
    updateWord(word.id, { is_add_later: true })
      .then(() => {
        handleGetNextWord();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  function handleWrongTranslation() {
    if (!word) return;
    setIsModerating(true);
    updateWord(word.id, { is_wrong_translation: true })
      .then(() => {
        handleGetNextWord();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModerating(false);
      });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.word}>
        {(isLoading || isModerating) && "Loading... / Loading..."}
        {!isLoading && !isModerating && `${word?.en} / ${word?.ru}`}
      </h2>

      {(isLoading || isModerating) && (
        <div className={styles.loadingImage}></div>
      )}
      {!isLoading && !isModerating && (
        <ImageViewer photoUrl={word?.photo_url || ""} alt={word?.en || ""} />
      )}
      <div className={styles.buttons}>
        <ConfrimImageButton
          onClick={handleConfirmImage}
          disabled={isLoading || isModerating}
        />
        <div className={styles.bottom}>
          <WithoutImageButton
            onClick={handleWithoutImage}
            disabled={isLoading || isModerating}
          />
          <AddImageLater
            onClick={handleAddImageLater}
            disabled={isLoading || isModerating}
          />
        </div>
        <Button
          onClick={handleWrongTranslation}
          disabled={isLoading || isModerating}
        >
          Неверный перевод
        </Button>
      </div>
    </div>
  );
};
