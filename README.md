### Usage Example
Place the following in `/.github/workflows/main.yml`
```yml
on: push
name: Clean FTP directory
jobs:
  clean:
    runs-on: ubuntu-latest
    steps:
    - name: 
        uses: taylorgibb/ftp-clean@v2.0.3
        with:
          host: ${{secrets.FTP_HOST}}
          user: "${{secrets.FTP_HOST}}|${{secrets.FTP_USER}}"
          password: ${{secrets.FTP_PASSWORD}}
```

---

### Notes
- Some FTP severs have have virtual hosts enabled, remember to format your username correctly in these cases.
---

### Setup Steps
1. Select the repository you want to add the action to
2. Select the `Actions` tab
3. Select `Blank workflow file` or `Set up a workflow yourself`, if you don't see these options manually create a yaml file `Your_Project/.github/workflows/main.yml`
4. Paste the example above into your yaml file and save
5. Now you need to add a key to the `secrets` section in your project. To add a `secret` go to the `Settings` tab in your project then select `Secrets`. Add a new `Secret` for: 
    * FTP_HOST
    * FTP_USER
    * FTP_PASSWORD
6. Update your yaml file settings
7. If you appreciate this github action give it a :star:

---

### Settings
| Key | Required | Example | Default | Description |
|---|---|---|---|---|
| host | true | ftp.developerhut.co.za |  | FTP server address |
| user | true | user |  | FTP server username |
| password | true | password |  | FTP server password |
| exclude | false | '["user_uploads"]' | '[""]' | JSON array of files and directories to exclude. |

# Common Examples
#### Exclude `user_uploads` directory
```yml
on: push
name: Clean FTP directory
jobs:
  clean:
    runs-on: ubuntu-latest
    steps:
    - name: 
        uses: taylorgibb/ftp-clean@v2.0.3
        with:
          host: ${{secrets.FTP_HOST}}
          user: "${{secrets.FTP_HOST}}|${{secrets.FTP_USER}}"
          password: ${{secrets.FTP_PASSWORD}}
          exclude: '["user_uploads"]'
```

_Want another example? Let me know by creating a [github issue](https://github.com/taylorgibb/ftp-clean/issues/new)_
