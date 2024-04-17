create table filmes (
	id serial primary key,
  nome text not null,
  descricao text,
  diretor text,
  ano_lancamento date not null,
  tipo text
);

create table usuario (
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);