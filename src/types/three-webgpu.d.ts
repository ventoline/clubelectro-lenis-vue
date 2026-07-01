/**
 * Type shim for three/webgpu.
 * Re-exports everything from three plus adds WebGPURenderer.
 */
declare module 'three/webgpu' {
  export * from 'three'

  import { WebGLRenderer, WebGLRendererParameters } from 'three'

  export interface WebGPURendererParameters extends WebGLRendererParameters {
    forceWebGL?: boolean
  }

  export class WebGPURenderer extends WebGLRenderer {
    constructor(parameters?: WebGPURendererParameters)
    init(): Promise<void>
    setClearAlpha(alpha: number): void
  }
}
