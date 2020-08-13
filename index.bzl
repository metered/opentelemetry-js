
load("@npm//@bazel/typescript:index.bzl", "ts_library")

def library(name, target_name = None, exclude = [], deps = [], module_root = None, extra_srcs=[]):
  if not module_root:
    module_root = "packages/opentelemetry-" + name + "/src"

  _module_name = '@opentelemetry/' + name
  _module_root = module_root + "/index.d.ts"
  _name = target_name or name
  srcs = native.glob([
    module_root + "/**/*.ts"
  ], exclude=exclude)


  ts_library(
    name = _name,
    module_name = _module_name,
    module_root = _module_root,
    srcs = srcs,
    deps = deps,
    generate_externs = False,
  )

def iso_library(name, deps=[], node_deps=[], browser_deps=[], iso_deps=[], exclude=[]):
  src_dir = "packages/opentelemetry-" + name + "/src"

  expanded_deps = [
    d
    for ds in [
      [
        dep + "-shared",
      ] if dep.startswith(":") else [dep]
      for dep in iso_deps
    ]
    for d in ds
  ]

  library(
    target_name = name + "-platform-common",
    name = name + "/platform/common",
    module_root = src_dir + "/platform/common",
    exclude = exclude,
    deps = expanded_deps + deps,
  )

  library(
    target_name = name + "-shared",
    name = name,
    exclude = [
      src_dir + "/platform/**/*.ts",
    ] + exclude,
    deps = expanded_deps + deps + [
      ":" + name + "-platform-common",
    ],
  )

  all_node_deps = [
    d
    for ds in [
      [
        dep + "-shared",
      ] if dep.startswith(":") else [dep]
      for dep in iso_deps
    ]
    for d in ds
  ]

  all_node_deps = expanded_deps + [
    "@npm//@types/node",
  ] + deps + node_deps

  library(
    target_name = name + "-platform-node",
    name = name + "/platform",
    module_root = src_dir + "/platform/node",
    exclude = exclude,
    deps = all_node_deps + [ ":" + name + "-platform-common" ],
  )

  all_browser_deps = expanded_deps + deps + browser_deps

  library(
    target_name = name + "-platform-browser",
    name = name + "/platform",
    module_root = src_dir + "/platform/browser",
    exclude = exclude,
    deps = all_browser_deps + [ ":" + name + "-platform-common" ],
  )
