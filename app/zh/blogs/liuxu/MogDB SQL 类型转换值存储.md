---
title: 'MogDB SQL 类型转换值存储'

date: '2022-09'

tags: ['MogDB SQL 类型转换值存储']
category: 'blog'
archives: '2022-09'

author: '由迪'

summary: 'MogDB SQL 类型转换值存储'

img: ''

times: '10:20'
---

# MogDB SQL 类型转换值存储

## 值存储数据类型解析

1. 查找与目标字段准确的匹配。
2. 试着将表达式直接转换成目标类型。如果已知这两种类型之间存在一个已注册的转换函数，那么直接调用该转换函数即可。如果表达式是一个未知类型文本，该文本字符串的内容将交给目标类型的输入转换过程。
3. 检查一下看目标类型是否有长度转换。长度转换是一个从某类型到自身的转换。如果在 pg_cast 表里面找到一个，那么在存储到目标字段之前先在表达式上应用。这样的转换函数总是接受一个额外的类型为 integer 的参数，它接收目标字段的 atttypmod 值（实际上是其声明长度，atttypmod 的解释随不同的数据类型而不同），并且它可能接受一个 Boolean 类型的第三个参数，表示转换是显式的还是隐式的。转换函数负责施加那些长度相关的语义，比如长度检查或者截断。

## 示例

character 存储类型转换。对一个目标列定义为 character(20)的语句，下面的语句显示存储值的长度正确：

```sql
MogDB=# CREATE TABLE tpcds.value_storage_t1 (
    VS_COL1 CHARACTER(20)
);
MogDB=# INSERT INTO tpcds.value_storage_t1 VALUES('abcdef');
MogDB=# SELECT VS_COL1, octet_length(VS_COL1) FROM tpcds.value_storage_t1;
       vs_col1        | octet_length
----------------------+--------------
 abcdef               |           20
(1 row)
)

MogDB=# DROP TABLE tpcds.value_storage_t1;
```

**说明**:

这里真正发生的事情是两个 unknown 文本缺省解析成 text，这样就允许||操作符解析成 text 连接。然后操作符的 text 结果转换成 bpchar(“空白填充的字符型”， character 类型内部名称)以匹配目标字段类型。不过，从 text 到 bpchar 的转换是二进制兼容的，这样的转换是隐含的并且实际上不做任何函数调用。最后，在系统表里找到长度转换函数 bpchar(bpchar, integer, Boolean) 并且应用于该操作符的结果和存储的字段长。这个类型相关的函数执行所需的长度检查和额外的空白填充。
