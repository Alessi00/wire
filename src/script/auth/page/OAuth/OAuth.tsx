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

import React from 'react';
import {useLocation} from 'react-router';

export const OAuth: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const state = params.get('state');

  const storedState = localStorage.getItem('oauth_state');

  if (!state || !storedState || state !== storedState) {
    return <div>states do not match</div>;
  }
  return <div>Hello OAuth {code}</div>;
};
