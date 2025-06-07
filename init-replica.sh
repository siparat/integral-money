#!/bin/bash
mongosh
rs.initiate()
cfg = rs.conf()
cfg.members[0].host = "database:27017"
rs.reconfig(cfg, {force: true})
