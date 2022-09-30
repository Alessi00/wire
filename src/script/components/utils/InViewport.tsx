/*
 * Wire
 * Copyright (C) 2022 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import React, {useEffect, useRef} from 'react';
import {overlayedObserver} from '../../ui/overlayedObserver';
import {viewportObserver} from '../../ui/viewportObserver';

interface InViewportParams {
  onVisible: () => void;
  requireFullyInView?: boolean;
  allowBiggerThanViewport?: boolean;
}

const InViewport: React.FC<InViewportParams & React.HTMLProps<HTMLDivElement>> = ({
  children,
  onVisible,
  requireFullyInView = false,
  allowBiggerThanViewport = false,
  ...props
}) => {
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = domNode.current;
    if (!element) {
      return undefined;
    }

    let inViewport = false;
    let visible = false;
    const releaseTrackers = () => {
      overlayedObserver.removeElement(element);
      viewportObserver.removeElement(element);
    };

    const triggerCallbackIfVisible = () => {
      if (inViewport && visible) {
        onVisible();
        releaseTrackers();
      }
    };

    viewportObserver.trackElement(
      element,
      (isInViewport: boolean) => {
        inViewport = isInViewport;
        triggerCallbackIfVisible();
      },
      element.parentElement || undefined,
      requireFullyInView,
      allowBiggerThanViewport,
    );
    overlayedObserver.trackElement(element, isVisible => {
      visible = isVisible;
      triggerCallbackIfVisible();
    });
    return () => releaseTrackers();
  }, [allowBiggerThanViewport, requireFullyInView, onVisible]);

  return (
    <div ref={domNode} {...props} css={{minHeight: '1px'}}>
      {children}
    </div>
  );
};

export default InViewport;
