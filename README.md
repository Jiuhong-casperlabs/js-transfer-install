### restrict access

#### step1: deploy share 

#### step2: deploy `locked` which initial public keys which can have access right.

```
npm run deploylock
```

#### step3: call entry point `get_access` of `locked` to gain access. 

```
npm run calllocked
```

#### step4: call entry point `group_access_only` of `locked` to see if function can be accessed. `User error: 777` is expected.
```
npm run lockedgco
```

### public key string to account hash

```
npm run ptoa
```

### execute package with version

```
npm run package
```

### store tuple

```bash
npm run sessionstoretuple
```

### exec_transfer_from

step1: to initial namedkey "allowances\-{owner}\-{sender}"

```bash
npm run erc20-exec-approve
```

step2:

```bash
npm run transferfrom
```

Others see package.json
