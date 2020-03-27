select p.title, p.img, p.content, pl.username, pl.profile_pic
from posts p
join people pl on pl.people_id = p.author_id
where p.post_id = $1; 