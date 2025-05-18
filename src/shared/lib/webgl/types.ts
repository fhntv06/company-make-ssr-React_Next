export interface WebglModelConfig {
  sceneFile: string;
  scenePublicPath: string;
  textures: Record<string, Record<string, string>>;
  materials: Record<string, Record<string, string>>;
  objects: Record<string, Record<string, string>>;
}
