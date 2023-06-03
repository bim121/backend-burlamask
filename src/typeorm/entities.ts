import { ChangedImageEntity } from "src/entity/changedImage.entity";
import { InitialImageEntity } from "src/entity/initalImage.entity";
import PublicFile from "src/entity/publicImage.entity";
import { UserEntity } from "src/entity/user.entity";

const entities = [InitialImageEntity, PublicFile, ChangedImageEntity, UserEntity];

export {InitialImageEntity, PublicFile, ChangedImageEntity, UserEntity};
export default entities;