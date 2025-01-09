# Ears2Hear Music App

Ears2Hear is a music app designed to provide Christians with a platform to explore, manage, and enjoy a diverse range of Christian-themed music. Inspired by King David's acts of worship, the app aims to make it easier for people of faith to find music that uplifts their spirits and helps them connect with God.

## Key Features

- **User Registration**: Create accounts with field validation for secure and accurate inputs.
- **Track Management**: Create, edit, and delete tracks with confirmation prompts for secure actions.
- **Playlist Management**: Add, view, update, and delete playlists for personalized music collections.
- **Favorites**: Save and manage favorite tracks for quick access.
- **UI Enhancements**: Improved design, cohesive color scheme, and a static Navbar for smooth navigation.

## Updates and Enhancements (Milestone 5)

| **Update Type**      | **Description**                                                                 | **Status** |
|-----------------------|---------------------------------------------------------------------------------|------------|
| **User Registration** | Added validation for names, passwords, and email formats.                      | Completed  |
| **Create Tracks**     | Users can create new tracks not available in the app.                          | Completed  |
| **Edit Tracks**       | Users can edit tracks with safeguards before saving changes.                   | Completed  |
| **Delete Tracks**     | Added confirmation prompts to prevent accidental deletions.                    | Completed  |
| **Track UI Changes**  | Added icons for liking/unliking and editing tracks.                            | Completed  |
| **Navbar**            | Static Navbar remains visible during scrolling.                                | Completed  |
| **UI Enhancements**   | Cohesive color scheme and improved overall design for better usability.        | Completed  |

## User Stories

| **User Story**                                                                 | **Route**                           | **Description**                                                                                                                                 |
|-------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| View all available tracks                                                    | `GET /tracks`                       | Fetches all tracks for listening and management.                                                                                                |
| Add tracks to a playlist                                                     | `POST /playlists/:playlist_id/tracks/:track_id` | Adds a track to a playlist.                                                                                                                     |
| Play music                                                                   | `GET /tracks/{trackId}/play`        | Plays a track by its ID.                                                                                                                        |
| Manage playlists (view, create, update, delete)                              | Various playlist-related routes     | Allows users to manage playlists with functionality for creating, updating, and deleting playlists.                                             |
| Add/remove tracks from favorites                                             | `POST/DELETE /users/{userId}/tracks/{trackId}` | Adds or removes tracks from the user's favorites.                                                                                               |

## Risks and Unknowns

- Determining the need for additional database tables/classes for artists.
- Managing variables involved in creating a music player.
- Integrating track files into the database.
- Designing and integrating account creation with the Navbar.

## API Documentation

All backend API endpoints were tested using [Postman](https://documenter.getpostman.com/view/36796918/2sAY4xC2bP) for consistency and correctness.

## Video Demos

- [Frontend Presentation](https://www.loom.com/share/f648fd13468741c888a77931de85b1fd?sid=a060bcc2-ea86-4d6c-9c3a-0891bacaa593)

## GitHub Repositories

- [Frontend Repository](https://github.com/kaihedrick/ears2hear.ReactFrontend)
- [Backend Repository](https://github.com/kaihedrick/Ears2Hear.Backend)

## References

- [Bible Gateway - New International Version](http://www.biblegateway.com/versions/New-International-Version-NIV-Bible/#booklist)
