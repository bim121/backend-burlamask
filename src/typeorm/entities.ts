import { ChangedImageEntity } from "src/entity/changedImage.entity";
import { InitialImageEntity } from "src/entity/initalImage.entity";
import MessageEntity from "src/entity/message.entity";
import PublicFile from "src/entity/publicImage.entity";
import { UserEntity } from "src/entity/user.entity";

const entities = [InitialImageEntity, PublicFile, ChangedImageEntity, UserEntity, MessageEntity];

export {InitialImageEntity, PublicFile, ChangedImageEntity, UserEntity, MessageEntity};
export default entities;