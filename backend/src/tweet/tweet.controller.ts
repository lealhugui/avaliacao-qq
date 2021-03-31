import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('api/v1/tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(createTweetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.update(+id, updateTweetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: string) {
    return this.tweetService.remove(+id);
  }
}
