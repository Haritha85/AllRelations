import { Resolver,Mutation,Arg,Query,Int } from "type-graphql";
import { Movie } from "../entities/Movie";

@Resolver()
export class MovieResolver{
    @Mutation(() => Boolean)
    async createmovie(
        @Arg("title") title:string,
        @Arg("minutes",() => Int)minutes:number
    ){
        await Movie.insert({title,minutes});
        return true;
    }
}



