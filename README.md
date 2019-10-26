# enva-cli

.envarc sample:

```json
{
  "commands": {
    "git": {
      "add": "git add",
      "push": "git push"
    },
    "sth": {
      ...
    }
  }
}
```

It will be:
```bash
$ enva git add . --> git add .
$ enva git push origin master --> git push origin master
```

You can also add commands using these enva commands:
```bash
$ enva command create
$ enva command delete
```