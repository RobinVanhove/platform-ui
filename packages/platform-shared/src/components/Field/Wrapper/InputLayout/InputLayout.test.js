/**
 * Copyright (c) 2021-2023 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import BootstrapVue from 'bootstrap-vue';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import InputLayout from './index';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const defaultProps = {
  id: '',
  errorMessages: [],
  name: '',
  description: '',
  label: '',
};

describe('InputLayout', () => {
  it('InputLayout component loaded no floating label', () => {
    const wrapper = shallowMount(InputLayout, {
      localVue,
      propsData: {
        ...defaultProps,
        floatingLabel: false,
      },
    });

    expect(wrapper.find('.floating-label').exists()).toBe(false);
  });

  it('InputLayout component renders help text and label', () => {
    const wrapper = mount(InputLayout, {
      localVue,
      mocks: { $t: (id) => id },
      propsData: {
        ...defaultProps,
        description: 'Help text',
        label: 'Label',
      },
    });
    const label = wrapper.find('label');
    const description = wrapper.find('small');

    expect(label.exists()).toBe(true);
    expect(label.html().includes('Label')).toBe(true);
    expect(description.exists()).toBe(true);
    expect(description.html().includes('Help text')).toBe(true);
  });

  it('InputLayout component renders slots', () => {
    const wrapper = mount(InputLayout, {
      localVue,
      propsData: {
        ...defaultProps,
      },
      slots: {
        default: '<span class="test_default">default</span>',
        prepend: '<span class="test_prepend">prepend</span>',
        append: '<span class="test_append">append</span>', // Will match <slot name="FooBar" />,
      },
    });

    expect(wrapper.find('.test_default').exists()).toBe(true);
    expect(wrapper.find('.test_prepend').exists()).toBe(true);
    expect(wrapper.find('.test_append').exists()).toBe(true);
  });

  it('InputLayout must contains floting-label class by default', () => {
    const wrapper = mount(InputLayout, {
      localVue,
      propsData: {
        ...defaultProps,
      },
      mocks: {
        $t: (text) => (text),
      },
    });

    expect(wrapper.find('.floating-label').exists()).toBe(true);
  });

  it('InputLayout without floating labels must not contains floting-label', () => {
    const wrapper = mount(InputLayout, {
      localVue,
      propsData: {
        ...defaultProps,
        floatingLabel: false,
      },
      mocks: {
        $t: (text) => (text),
      },
    });

    expect(wrapper.find('.floating-label').exists()).toBe(false);
  });
});
