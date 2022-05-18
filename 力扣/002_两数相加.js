/* 
2. 两数相加
  给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
  请你将两个数相加，并以相同形式返回一个表示和的链表。
  你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

  示例 1：
    输入：l1 = [2,4,3], l2 = [5,6,4]
    输出：[7,0,8]
    解释：342 + 465 = 807.

  示例 2：
    输入：l1 = [0], l2 = [0]
    输出：[0]

  示例 3：
    输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
    输出：[8,9,9,9,0,0,0,1]

  提示：
    每个链表中的节点数在范围 [1, 100] 内
    0 <= Node.val <= 9
    题目数据保证列表表示的数字不含前导零
*/

// 测试用例
var l1 = [2,4,3]
var l2 = [5,6,4]

// var l1 = {
//   head: {
//       value: 2,
//       next: {
//           value: 4,
//           next: {
//               value: 3,
//               next: null
//           }
//       }
//   }
// }

// var l2 = {
//   head: {
//       value: 5,
//       next: {
//           value: 6,
//           next: {
//               value: 4,
//               next: null
//           }
//       }
//   }
// }
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 解决方案
var addTwoNumbers = function(l1, l2) {
  let ary1 = new Array()
  let ary2 = new Array()
  let ary3 = new Array()
  let newLn = new Object()

  function getArray (ln, ary) {
      while (ln.next !== null) {
          ary.push(ln.val)
          ln = ln.next
      }
      ary.push(ln.val)
      ln.next = null
  }
  getArray(l1, ary1)
  getArray(l2, ary2)

  function createListArray (longAry, shortAry, target) {
      let flag = 0
      for (let i = 0; i < longAry.length; i++) {
          if (shortAry[i] == undefined) {
              if (longAry[i] + flag >= 10) {
                  target.push(longAry[i] + flag - 10)
                  flag = 1
              } else {
                  target.push(longAry[i] + flag)
                  flag = 0
              }
          } else {
              if (longAry[i] + shortAry[i] + flag >= 10) {
                  target.push(longAry[i] + shortAry[i] + flag - 10)
                  flag = 1
              } else {
                  target.push(longAry[i] + shortAry[i] + flag)
                  flag = 0
              }
          }
      }
      if (flag === 1) {
          target.push(1)
      }
  }
  if (ary1.length > ary2.length) {
      createListArray(ary1, ary2, ary3)
  } else {
      createListArray(ary2, ary1, ary3)
  }
  ary1 = null
  ary2 = null
  function createList (ary, obj) {
      let target = obj
      ary.forEach(function (item, index) {
          target.val = item
          if (index === ary.length - 1) {
              target.next = null
          } else {
              target.next = new Object()
              target = target.next
          }
      })
  }
  createList(ary3, newLn)
  return newLn
};

console.log(addTwoNumbers(l1, l2))
