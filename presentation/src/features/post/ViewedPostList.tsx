import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
// import { dateTimeFormat } from 'app/utils/utils';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { LastViewedPost } from '../../app/models/post';
import moment from 'moment';

interface Props {
  viewedPosts: LastViewedPost[];
}

export default function ViewedPostList({ viewedPosts }: Props) {
  useEffect(() => {
    // console.log(viewedPosts);
  }, []);

  return (
    <>
      <Timeline style={{ backgroundColor: '#EEC' }}>
        {viewedPosts.map((aViewedPost: LastViewedPost, idx) => {
          if (idx >= 6) return;
          return (
            <TimelineItem key={aViewedPost.id}>
              <TimelineOppositeContent
                color="text.secondary"
                sx={{ m: 'auto 0', mt: 2 }}
                align="right"
                variant="body2"
              >
                {/* {dateTimeFormat(aViewedPost.timestamp)} */}
                {moment(aViewedPost.timestamp).fromNow()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <Avatar src={`${aViewedPost.photos?.[0]?.url}`} />
                </TimelineDot>
                <TimelineConnector
                  style={{
                    height: '15px',
                    width: '2px',
                    backgroundColor: 'gray',
                  }}
                />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography
                  style={{ color: 'black' }}
                  component={NavLink}
                  to={`/posts/${aViewedPost.id}`}
                  sx={{ color: 'black' }}
                >
                  <Link href="#" underline="hover" color="black">
                    {aViewedPost.title}...
                  </Link>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {/* <Divider variant="inset" component="li" /> */}
        <br />
        <Link href="/viewedList" underline="hover" style={{ marginLeft: 25 }}>
          {'Check more viewed posts here'}
        </Link>
      </Timeline>
    </>
  );
}
