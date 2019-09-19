# Instalação

Foi usado postgreSQL como banco de dados.


Na pasta `pg_dump` contém os dados do banco (data dump) para importação do banco, é o script pronto do postgres. `qq_twitter_db.png` contém o esquema conceitual do banco.

Levando em consideração ao tipo de aplicação, teria sido melhor utilizar algo não relacional (como mongoDB) pela praticidade e por motivos de instalação.

## Caso o DB tenha sido importado
Pode-se usar o script `start.sh` para iniciar tanto o front como o end.

No terminal 

```
bash ./start.sh
```

-------------------------
-------------------------
<br>
<br>
<br>

# Considerações da Atividade

Foi usado `NODE.js` para o backend e `React` para o frontend. Uma tecnologia que possuia pouco contato e outra que possuia minimo contato.

Foi usado `Express` para comunicação do front e do backend, pacote que ainda não havia tido oportunidade de usar antes deste teste.

## O que está funcionando e o que não está funcionando

Devido ao tempo somado as minhas limitações de conhecimento as seguintes funções foram implementadas/não implementadas:

### Implementadadas e funcionando
* tela de login (verificando no BD)
* chamadas post no express para conferir login, ver seguidores e buscar tweets de seguidores

### "Implementado" mas não funcionando
* feed
* pesquisa de usuarios

### Não implementado
* seguir usuarios
* postar tweets