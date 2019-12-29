// 对象深拷贝函数
function deepMerge(...objs) {
    const result = Object.create(null)

    // 遍历参数
    objs.forEach(obj => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const val = obj[key]
                // 若参数的值仍为对象进行递归处理
                if (isPlainObject(val)) {
                    // 结果中存在相同的key且其值为对象则再次合并
                    if (isPlainObject(result[key])) {
                        result[key] = deepMerge(result[key], val)
                    } else {
                        // 不为对象则直接保存递归结果
                        result[key] = deepMerge(val)
                    }
                } else {
                    // 参数的值不为对象就直接保存至结果中
                    result[key] = val
                }
            })
        }
    })

    return result
}