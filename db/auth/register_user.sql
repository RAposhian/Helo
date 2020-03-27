insert into people (
   password,
   username
) values (
   ${password},
   ${username}
)
returning people_id, username;