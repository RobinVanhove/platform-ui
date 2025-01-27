/**
 * Copyright (c) 2023 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { mount } from '@vue/test-utils';
import { findByTestId } from '@forgerock/platform-shared/src/utils/testHelpers';
import { setupTestPinia } from '@forgerock/platform-shared/src/utils/testPiniaHelpers';
import flushPromises from 'flush-promises';
import * as AccessRequestApi from '@/api/governance/AccessRequestApi';
import i18n from '@/i18n';
import router from '@/router';
import ApprovalDetails from './ApprovalDetails';

jest.mock('@/api/governance/AccessRequestApi');

const accessRequest = {
  application: {
    description: 'My Azure App',
    icon: '',
    id: '2',
    name: 'My Azure App',
    templateName: 'azure.ad',
    templateVersion: '2.0',
  },
  decision: {
    comments: [],
    completionDate: null,
    deadline: null,
    outcome: null,
    phases: [],
    startDate: '2023-06-22T19:23:26+00:00',
    status: 'in-progress',
  },
  id: 1,
  request: {
    common: {
      endDate: '2023-07-15T19:23:26+00:00',
      priority: 'medium',
    },
  },
  requestType: 'applicationRemove',
  requester: {
    givenName: 'Andrew',
    id: '1234-456-2',
    mail: 'andrew.hertel@test.com',
    sn: 'Hertel',
    userName: 'andrew.hertel@test.com',
  },
  user: {
    givenName: 'Manuel',
    id: '1234-456-3',
    mail: 'manuel.escobar@test.com',
    sn: 'Escobar',
    userName: 'manuel.escobar@test.com',
  },
};

describe('ApprovalDetails', () => {
  const setup = (props) => {
    setupTestPinia({ user: { userId: '1234' } });
    return mount(ApprovalDetails, {
      ...props,
      router,
      i18n,
    });
  };

  let wrapper;

  beforeEach(() => {
    AccessRequestApi.getUserApprovals = jest.fn().mockReturnValue(Promise.resolve({
      data: { result: [accessRequest] },
    }));
  });

  describe('@Component Tests', () => {
    it('has header with request type and name', async () => {
      wrapper = setup();
      await flushPromises();
      const header = findByTestId(wrapper, 'approval-detail-header');
      expect(header.text()).toContain('Remove Application');
      expect(header.text()).toContain('My Azure App');
    });
    it('shows request details', async () => {
      wrapper = setup();
      await flushPromises();
      const detail = findByTestId(wrapper, 'approval-detail');
      expect(detail.text()).toContain('My Azure App');
      expect(detail.text()).toContain('Manuel Escobar');
      expect(detail.text()).toContain('manuel.escobar@test.com');
      expect(detail.text()).toContain('Remove Application');
      expect(detail.text()).toContain('Pending');
      expect(detail.text()).toContain('Medium Priority');
    });

    it('can get an inactive approval', async () => {
      AccessRequestApi.getUserApprovals = jest.fn().mockReturnValue(Promise.reject());
      AccessRequestApi.getRequest = jest.fn().mockReturnValue(Promise.resolve({
        data: accessRequest,
      }));
      wrapper = setup();
      await flushPromises();

      const header = findByTestId(wrapper, 'approval-detail-header');
      expect(header.exists()).toBeTruthy();
      const detail = findByTestId(wrapper, 'approval-detail');
      expect(detail.exists()).toBeTruthy();
    });

    describe('actions', () => {
      describe('active approval', () => {
        beforeEach(() => {
          wrapper = setup();
        });
        it('shows approve action', () => {
          const actions = findByTestId(wrapper, 'approval-detail-actions');
          expect(actions.text()).toContain('Approve');
        });
        it('shows reject action', () => {
          const actions = findByTestId(wrapper, 'approval-detail-actions');
          expect(actions.text()).toContain('Reject');
        });
        it('shows forward action', () => {
          const actions = findByTestId(wrapper, 'approval-detail-actions');
          expect(actions.text()).toContain('Forward');
        });
      });
      it('hides actions for inactive approval', async () => {
        AccessRequestApi.getUserApprovals = jest.fn().mockReturnValue(Promise.reject());
        AccessRequestApi.getRequest = jest.fn().mockReturnValue(Promise.resolve({
          data: accessRequest,
        }));
        wrapper = setup();
        await flushPromises();

        const actions = findByTestId(wrapper, 'approval-detail-actions');
        expect(actions.exists()).toBeFalsy();
      });
    });
  });
});
