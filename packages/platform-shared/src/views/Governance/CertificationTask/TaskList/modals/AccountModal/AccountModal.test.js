/**
 * Copyright (c) 2023 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { shallowMount } from '@vue/test-utils';
import AccountModal from './index';

describe('AccountModal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(AccountModal, {
      mocks: {
        $t: (t) => t,
      },
      propsData: {
        account: {
          id: 'test',
        },
      },
    });
  });

  it('component should load correclty', () => {
    expect(wrapper.vm.account).toStrictEqual({ id: 'test' });
  });
});
