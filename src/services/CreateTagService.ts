import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const TagsRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Incorrect name");
    }

    const tagAlreadyExists = await TagsRepository.findOne({
      name
    });

    if (tagAlreadyExists) {
      throw new Error("Tag already exists");
    }

    const tag = TagsRepository.create({
      name
    });

    await TagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };