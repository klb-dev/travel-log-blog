import { useEffect, useRef, useState } from "react";
import styles from "./PostModal.module.css";

function PostModal({ post, onClose }) {
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!post) return;

    const focusableElementsString =
      "a[href], button:not([disabled]), textarea, input, select";
    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(focusableElementsString);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function trapFocus(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          onClose();
        }, 300);
      }
    }

    document.addEventListener("keydown", trapFocus);
    firstElement?.focus();

    return () => {
      document.removeEventListener("keydown", trapFocus);
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match the popOut animation time
  };
  

  return (
    <>
      <div className={styles.backdrop} onClick={handleClose}></div>
      <div ref={modalRef} className={`${styles.modal} ${isClosing ? styles.closing : ""}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.date}>{post.date}</p>
        <p>{post.longDescription}</p>
        <div className={styles.links}>
          {post.links?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default PostModal;
