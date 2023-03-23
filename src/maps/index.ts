import { mapBookResponseToBook } from '@/maps/book'
import { mapCharacterResponseToCharacter } from '@/maps/character'
import { mapGenderResponseToGender } from '@/maps/gender'
import { mapMovieResponseToMovie } from '@/maps/movie'

export const maps = {
  BookResponse: { Book: mapBookResponseToBook },
  CharacterResponse: { Character: mapCharacterResponseToCharacter },
  GenderResponse: { Gender: mapGenderResponseToGender },
  MovieResponse: { Movie: mapMovieResponseToMovie },
}