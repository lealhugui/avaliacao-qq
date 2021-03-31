import { Tweet } from './entities/tweet.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet) private tweetRepository: Repository<Tweet>,
  ) {}
  async create(createTweetDto: CreateTweetDto) {
    const data = await this.tweetRepository.create(createTweetDto);
    return this.tweetRepository.save(data);
  }

  findAll() {
    return this.tweetRepository.find();
  }

  async findOne(id: number) {
    const tweetEncontrado = await this.tweetRepository.findOne({ id });

    if (!tweetEncontrado) {
      throw new NotFoundException(`Tweet não encontrado!`);
    }

    return tweetEncontrado;
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    const tweetEncontrado = await this.findOne(id);

    await this.tweetRepository.update(tweetEncontrado, {
      ...updateTweetDto,
    });

    const tweetUpdated = this.tweetRepository.create({
      ...tweetEncontrado,
      ...updateTweetDto,
    });

    return tweetUpdated;
  }

  async remove(id: number) {
    const tweetEncontrado = await this.findOne(id);

    if (tweetEncontrado) {
      await this.tweetRepository.delete(id);

      return true;
    }

    return false;
  }
}
