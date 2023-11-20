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

const TargetURLKey = 'E2EIdentity_OIDCService_TargetURL';
const ClientKey = 'E2EIdentity_OIDCService_Client';

type ClientID = string;
type ClientSecret = string;
export type Client = `${ClientID}:${ClientSecret}`;

const OIDCServiceStore = {
  store: {
    targetURL: (url: string) => localStorage.setItem(TargetURLKey, url),
    client: (client: Client) => localStorage.setItem(ClientKey, client),
  },
  get: {
    targetURL: () => localStorage.getItem(TargetURLKey),
    client: (): {
      id: ClientID;
      secret: ClientSecret;
    } | null => {
      const client = localStorage.getItem(ClientKey);
      if (!client) {
        return null;
      }
      const [clientId, clientSecret] = client.split(':');
      return {
        id: clientId,
        secret: clientSecret,
      };
    },
  },
  has: {
    targetURL: () => localStorage.getItem(TargetURLKey) !== null,
    client: () => localStorage.getItem(ClientKey) !== null,
  },
  clear: {
    targetURL: () => localStorage.removeItem(TargetURLKey),
    client: () => localStorage.removeItem(ClientKey),
    all: () => {
      OIDCServiceStore.clear.targetURL();
      OIDCServiceStore.clear.client();
    },
  },
};

export {OIDCServiceStore};
