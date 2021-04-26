# Papyrus Example

[![Build Status](https://travis-ci.org/opencaesar/papyrus-example.svg?branch=master)](https://travis-ci.org/opencaesar/papyrus-example)
[![Release](https://img.shields.io/github/v/tag/opencaesar/papyrus-example?label=release)](https://github.com/opencaesar/papyrus-example/releases/latest)
[![Documentation](https://img.shields.io/badge/Documentation-HTML-orange)](https://opencaesar.github.io/papyrus-example/) 
[![Gitpod](https://img.shields.io/badge/gitpod-open-blue?logo=gitpod)](https://gitpod.io/#https://github.com/opencaesar/papyrus-example) 

This repository exemplifies the usage of the [Papyrus OML adapter](https://github.com/opencaesar/papyrus-adapter).

## Clone
```
  git clone https://github.com/opencaesar/papyrus-example.git
  cd papyrus-example
```

## Build
Equivalent to owlReason task
```
./gradlew build
```
## Publish to Maven Local
```
./gradlew publishToMavenLocal
```

## Generate Docs
You must first have Bikeshed (the app itself) installed from [here](https://tabatkins.github.io/bikeshed/#install-final)
```
./gradlew generateDocs
```
Note: if bikeshed is not in the PATH, you can add -pBIKESHED=path/to/bikeshed argument

## Run OWL Reasoner
```
./gradlew owlReason
```

## Start Fuseki Server
```
./gradlew startFuseki
```

## Stop Fuseki Server
```
./gradlew stopFuseki
```

## Load Dataset to Fuseki
```
./gradlew <dataset>:owlLoad
```
Pre-req: A Fuseki server with the <dataset> must be running at http://localhost:3030/<dataset> (see below)  

## Run SPARQL Queries
```
./gradlew <dataset>:owlQuery
```
Pre-req: A Fuseki server with the <dataset> must be running at http://localhost:3030/<dataset> (see below) 
