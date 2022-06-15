import React, { useEffect, useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import { Avatar, Grid, Link, Typography } from '@mui/material';
import { LastViewedPost } from 'app/models/post';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { uniqueViewPostsByKey } from 'app/utils/utils';

export default function ViewedPostsHistory() {
  const lastViewedPosts = Array.from(
    JSON.parse(window.localStorage.getItem('lastViewedPosts') || '[]')
  );

  const [_lastViewedPost, setLastViewedPost] = useState(
    Array.from(
      JSON.parse(window.localStorage.getItem('lastViewedPosts') || '[]')
    )
  );

  const uniqueLastViewedPosts = uniqueViewPostsByKey(
    'id',
    lastViewedPosts as LastViewedPost[]
  );

  useEffect(() => {
    console.log(_lastViewedPost.length);
  }, [_lastViewedPost]);

  return (
    <Grid container>
      <Timeline style={{ backgroundColor: '#EEC' }}>
        {uniqueLastViewedPosts.map((aViewedPost: LastViewedPost, idx) => {
          return (
            <TimelineItem key={aViewedPost.id}>
              <TimelineOppositeContent
                color="text.secondary"
                sx={{ m: 'auto 0', mt: 2 }}
                align="right"
                variant="body2"
              >
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
                <Typography>{/* {`Posted by ${aViewedPost.}`} */}</Typography>
                <Typography
                  style={{ color: 'black' }}
                  component={NavLink}
                  to={`/posts/${aViewedPost.id}`}
                  sx={{ color: 'black' }}
                >
                  <Link underline="hover" color="black">
                    {aViewedPost.title}...
                  </Link>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        <br />
      </Timeline>
    </Grid>
  );
}
