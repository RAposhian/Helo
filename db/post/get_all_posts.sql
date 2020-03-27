select *
from posts p
join people pl on pl.people_id = p.author_id;