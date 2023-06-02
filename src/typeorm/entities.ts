import { ChangedImageEntity } from "src/entity/changedImage.entity";
import { InitialImageEntity } from "src/entity/initalImage.entity";
import PublicFile from "src/entity/publicImage.entity";

const entities = [InitialImageEntity, PublicFile, ChangedImageEntity];

export {InitialImageEntity, PublicFile, ChangedImageEntity};
export default entities;