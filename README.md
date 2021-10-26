### Restrict access

#### step1: deploy share 

#### step2: deploy `locked` with initial public keys which can have access right.

```
npm run deploylock
```

#### step3: call entry point `get_access` of `locked` to gain access. 
Only public keys which are in public keys list of step2 can get access. Others will return `User error: 1` 

```
npm run calllocked
```

#### step4: call entry point `group_access_only` of `locked` to see if function can be accessed. 
If the public key has access right, `User error: 777`  (intentional) is returned.
```
npm run lockedgco
```

### Public key string to account hash

```
npm run ptoa
```

### Execute package with version

```
npm run package
```

### Store tuple

```bash
npm run sessionstoretuple
```

### Exec_transfer_from

step1: to initial namedkey "allowances\-{owner}\-{sender}"

```bash
npm run erc20-exec-approve
```

step2:

```bash
npm run transferfrom
```

Others see package.json
