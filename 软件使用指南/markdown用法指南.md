写在前面：在代码区块里面， & 、 < 和 > 会自动转成 HTML 实体
### 一、区块元素
1.段落和换行<br />
2.标题
# 2.1这是H1
## 2.2这是H2
###### 2.3这是H6
3.块引用
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.
> This is the first level of quoting.
>
> > 1.This is nested blockquote.
> > 
> > 2.This is nested blockquote.
>
> Back to the first level.

4.列表

4. 1. 2. liebiao1
4. 2. liebiao2
4. 3. liebiao3
+ liebiao1
+ + liebiao2
+ liebiao3
- - liebiao1
- - - liebiao2
- - liebiao3
1986\. What a great season.用反斜杠避免转成列表符号

5.分割线
    - - -
    ***
    * * *

###二、区段元素
1.链接
    在方块括号后面紧接着圆括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来

This is [an example](http://example.com/ "Title") inline link.

I get 10 times more traffic from [Google][] than from [Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"
2.强调<br  />

_single underscores_

**double asterisks**

3.代码

如果要标记一小段行内代码，你可以用反引号把它包起来（`）

Use the `* & printf()` function.

4.图片

![Alt text](/path/to/img.jpg "Optional title")

###三、其他

1.超链接
<http://example.com/>