# enva-cli

.envarc sample:

```json
{
  "commands": {
    // It can be grouped
    "git": {
      "add": "git add",
      "push": "git push"
    },
    // Or be single
    "sth": "sth"
  }
}
```

It will be:
```bash
$ enva git add . --> git add .
$ enva git push origin master --> git push origin master
```

You can also generate this file using:
```bash
$ enva init
```

You can also add commands using these enva commands:
```bash
$ enva command create
$ enva command delete
```