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

import {OIDCService} from './OIDCService';
import {OIDCServiceStore} from './OIDCServiceStorage';

// ToDo: remove this. It is just for testing until we get the data from the server
const tempClientID = 'wireapp';
const tempClientSecret = 'dUpVSGx2dVdFdGQ0dmsxWGhDalQ0SldU';
OIDCServiceStore.store.client(`${tempClientID}:${tempClientSecret}`);

// lots of hardcoded values here, but this is just for testing until we have a proper OIDC service
export const getOIDCServiceInstance = (): OIDCService => {
  // if there is no targetURL, we cannot create an OIDCService
  const targetURL = OIDCServiceStore.get.targetURL();
  if (!targetURL) {
    throw new Error('No targetURL found in OIDCServiceStore');
  }
  const client = OIDCServiceStore.get.client();
  if (!client) {
    throw new Error('No client found in OIDCServiceStore');
  }

  const oidcService = new OIDCService({
    oidcClient: client,
    authorityUrl: targetURL,
    redirectUri: `${location.origin}/oidc`,
  });
  return oidcService;
};
