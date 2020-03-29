import { useRef, useEffect } from "react";

function createRootElement(id: string) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
}

function addRootElement(rootElem: HTMLElement) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild &&
      document.body.lastElementChild.nextElementSibling
  );
}

function usePortal(id: string) {
  const rootElemRef = useRef(null);

  useEffect(function setupElement() {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      //@ts-ignore
      addRootElement(parentElem);
    }

    //@ts-ignore
    parentElem.appendChild(rootElemRef.current);

    return function removeElement() {
      //@ts-ignore
      rootElemRef.current.remove();
      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, []);

  function getRootElem() {
    if (!rootElemRef.current) {
      //@ts-ignore
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
