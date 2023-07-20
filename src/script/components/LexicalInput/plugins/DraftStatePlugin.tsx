/*
 * Wire
 * Copyright (C) 2023 Wire Swiss GmbH
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

import {useCallback, useEffect} from 'react';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

import {getTextValue} from '../utils/getTextValue';

interface DraftStatePluginProps {
  loadDraftStateLexical: () => Promise<any>;
  setInputValue: (value: string) => void;
}

export const DraftStatePlugin = ({loadDraftStateLexical, setInputValue}: DraftStatePluginProps) => {
  const [editor] = useLexicalComposerContext();

  const getDraftState = useCallback(async () => {
    const draftState = await loadDraftStateLexical();

    if (draftState.editorState) {
      const initialEditorState = editor.parseEditorState(draftState.editorState);
      editor.setEditorState(initialEditorState);

      const textValue = getTextValue(editor);
      setInputValue(textValue);
    }
  }, [editor, loadDraftStateLexical, setInputValue]);

  useEffect(() => {
    getDraftState(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};
