import moment from 'moment';
import { LastViewedPost, Post } from '../models/post';
import { User } from '../models/user';

export const dateFormatNotUtc = (date: string) =>
  moment(date).format('YYYY-MM-DD');

export const dateFormat = (date: string) =>
  moment(date).utc().add(9, 'h').format('YYYY-MM-DD');

export const dateMonthFormat = (date: string) =>
  moment(date).utc().add(9, 'h').format('YY-MM-DD');

export const dateTimeFormat = (date: string) =>
  moment(date).utc().add(9, 'h').format('LLL');

export const dateYearFormat = (date: string) => moment(date).format('YYYY');

export const isFollowingThisPost = (user: User, currentPost: Post) => {
  return currentPost?.postParticipants?.some(
    (x) => x.username === user?.username
  );
};

// Note: get unique value from array of objects
// export const uniqueViewPostArrayByKey = (lastViewedPosts: LastViewedPost[]) => {
//   const result = lastViewedPosts
//     .map((aViewedPost) => aViewedPost.id)
//     .filter((value, idx, self) => self.indexOf(value) === idx);
//   return result;
// };

// get unique object from array of objects
export const uniqueViewPostsByKey = (
  key: string,
  lastViewedPosts: LastViewedPost[]
) => {
  const result = new Map(
    lastViewedPosts.map((item: any) => [item[key], item])
  ).values();

  return Array.from(result);
};
