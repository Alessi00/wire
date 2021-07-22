/*
 * Wire
 * Copyright (C) 2021 Wire Swiss GmbH
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

import React from 'react';

import {registerReactComponent} from 'Util/ComponentUtil';
import {t} from 'Util/LocalizerUtil';
import Icon from 'Components/Icon';

export interface RestrictedAudioProps extends React.HTMLProps<HTMLDivElement> {}

const RestrictedAudio: React.FC<RestrictedAudioProps> = ({}) => {
  return (
    <div className="audio-restricted">
      <div className="audio-restricted__icon">
        <Icon.MicOn width={24} height={24} />
      </div>
      <div className="audio-restricted__description">
        <div className="audio-restricted__description__headline">
          {t('conversationAssetRestrictedAudioMessageHeadline')}
        </div>
        <div className="audio-restricted__description__message">{t('conversationAssetRestricted')}</div>
      </div>
    </div>
  );
};

export default RestrictedAudio;

registerReactComponent<RestrictedAudioProps>('audio-restricted', {
  bindings: '',
  component: RestrictedAudio,
});
