import type { Component } from 'vue'
import * as FlowbiteVue from 'flowbite-vue'
import 'flowbite-vue/index.css'

const COMPONENT_PREFIXES = ['Fwb', 'Flowbite'] as const

type ComponentName = keyof typeof FlowbiteVue

type FlowbiteComponentMap = Partial<Record<ComponentName, Component>>

function extractComponents(): FlowbiteComponentMap {
  return Object.entries(FlowbiteVue).reduce<FlowbiteComponentMap>((registry, [name, entry]) => {
    if (
      COMPONENT_PREFIXES.some((prefix) => name.startsWith(prefix)) &&
      typeof entry === 'object' &&
      entry !== null
    ) {
      registry[name as ComponentName] = entry as Component
    }

    return registry
  }, {})
}

const flowbiteComponents = extractComponents()

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(flowbiteComponents).forEach(([name, component]) => {
    if (component) {
      nuxtApp.vueApp.component(name, component)
    }
  })
})
