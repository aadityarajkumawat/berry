# berryx

---

A CLI tool to provide a better developer experience, by simplifying some tasks while managing a project.

## Installation

```bash
npm install -g berryx
```

or

```bash
yarn global add berryx
```

## Commands

### setup

```bash
berryx setup
```

this adds a .gitignore, .editorconfig and .prettierrc, with some standard predefined configrations, in present working directory.

In case any of these files already exist it prompts the user to either skip this over or to overwrite its content

**We can also add each file indvidually by using the add command**

```bash
berryx add gitignore
berryx add prettierrc
berryx add gitignore
```

### kill-port

This command is used to kill a process running on a known port number, this is helpful in cases when you accidently close a terminal but the process is somehow still running, possibly due to some error while killing a terminal.

```bash
berryx kill-port <port-number>
```

**Example**

```bash
berryx kill-port 4000
```

### help

In order to get some help using berryx you can either use one of the these commands

```bash
berryx
```

or

```bash
berryx --help
```
