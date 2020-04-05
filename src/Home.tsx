import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragSizing } from 'react-drag-sizing';
import { Editor, EditorRefAttrs } from 'react-editor';
import styles from './Home.module.css';
import logo from './logo.svg';

const processText = (s: string) => s; // noop
const processHTML = (s: string) => s; // todo limit

export const Home: React.FC = () => {
  const [value, setValue] = useState('');
  const [imgHeight, setImgHeight] = useState('40px');
  const ref = useRef<EditorRefAttrs>(null);

  const setRandomValue = useCallback(() => {
    setValue(String(Math.random()));

    // wait for editor render
    setTimeout(() => {
      const editor = ref.current;
      if (editor) editor.focus();
    });
  }, []);

  const insertEmoji = useCallback(() => {
    const editor = ref.current;
    if (editor) editor.insertText('😁');
  }, []);

  const insertHTML = useCallback(() => {
    const editor = ref.current;
    if (editor)
      editor.insertHTML(
        // '&nbsp;<span contenteditable="false" class="atwho-item">@fritx</span>&nbsp;'
        '<img src="./static/media/logo.5d5d9eef.svg">'
      );
  }, []);

  const handleImgHeight = useCallback(e => {
    setImgHeight(e.target.value);
  }, []);

  useEffect(() => {
    document.title = 'react-drag-sizing';
  }, []);

  return (
    <div className={styles.Home}>
      <style>{`.${styles.EditorBlock3} img { height: ${imgHeight} }`}</style>

      <header className={styles.HomeHeader}>
        <img src={logo} className={styles.HomeLogo} alt="logo" />
        <a
          className={styles.HomeLink}
          href="https://github.com/fritx/react-drag-sizing"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-drag-sizing
        </a>
      </header>

      <section className={styles.EditorBlock3}>
        <div>
          <button className={styles.EditorButton} onClick={setRandomValue}>
            Set Random
          </button>
          <button className={styles.EditorButton} onClick={insertEmoji}>
            Insert Emoji
          </button>
          <button className={styles.EditorButton} onClick={insertHTML}>
            Insert HTML
          </button>
          <input
            type="text"
            className={styles.InputControl}
            value={imgHeight}
            onChange={handleImgHeight}
          />
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          <div
            style={{ flex: 1, wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
          <DragSizing
            border="left"
            style={{ minWidth: '15%', maxWidth: '85%', width: '50%' }}
            handlerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            <div className={styles.EditorWrap3}>
              <Editor
                ref={ref}
                placeholder="Try to drag on the left border 🤚"
                allowInWebDrop
                className={styles.Editor}
                processHTML={processHTML}
                processText={processText}
                value={value}
                onChange={setValue}
              />
            </div>
          </DragSizing>
        </div>
      </section>
    </div>
  );
};
